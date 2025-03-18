let session;
const SEQUENCE_LENGTH = 8;
let dataset = [];
let datasetEmbeddings = {};
let tokenizer = null;

async function waitForTransformers() {
  while (!window.transformers || !window.transformers.AutoTokenizer) {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

async function loadTokenizer() {
  try {
    await waitForTransformers();
    tokenizer = await window.transformers.AutoTokenizer.from_pretrained("Xenova/bert-base-uncased");
  } catch (error) {
    console.error("Error loading tokenizer:", error);
  }
}

async function loadDataset() {
  try {
    const response = await fetch("/assets/data/data.json");
    dataset = await response.json();
  } catch (error) {
    console.error("Error loading dataset:", error);
  }
}

function padOrTruncate(arr, length) {
  if (arr.length > length) return arr.slice(0, length);
  while (arr.length < length) arr.push(0);
  return arr;
}

function cosineSimilarity(vecA, vecB) {
  if (!Array.isArray(vecA) || !Array.isArray(vecB)) {
    console.error("Invalid vectors for cosine similarity:", vecA, vecB);
    return -1;
  }
  let dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  let magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  let magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}

function meanPooling(outputs) {
  let tensorValues = Array.from(outputs[Object.keys(outputs)[0]].data);
  if (!Array.isArray(tensorValues) || tensorValues.length === 0) {
    console.error("Invalid embeddings from model:", tensorValues);
    return new Array(384).fill(0);
  }
  return tensorValues;
}

function findBestMatch(userEmbedding) {
  let bestMatch = null;
  let bestScore = -1;
  let confidenceThreshold = 0.6;

  for (let question in datasetEmbeddings) {
    let similarity = cosineSimilarity(userEmbedding, datasetEmbeddings[question]);
    if (similarity > bestScore) {
      bestScore = similarity;
      bestMatch = question;
    }
  }
  if (bestScore < confidenceThreshold) {
    return "I'm not sure about that. Feel free to contact Dierta directly via LinkedIn!";
  }
  return dataset.find(item => item.question === bestMatch)?.answer || "I'm not sure about that.";
}

async function tokenize(text) {
  let inputIds = await tokenizer.encode(text);
  let attentionMask = new Array(inputIds.length).fill(1);
  let paddedInputIds = padOrTruncate(inputIds, SEQUENCE_LENGTH);
  let paddedAttentionMask = padOrTruncate(attentionMask, SEQUENCE_LENGTH);
  return {
    input_ids: paddedInputIds,
    attention_mask: paddedAttentionMask
  };
}

async function computeDatasetEmbeddings() {
  for (let item of dataset) {
    let tokens = await tokenize(item.question);
    let paddedInputIds = padOrTruncate(tokens.input_ids, SEQUENCE_LENGTH);
    let paddedAttentionMask = padOrTruncate(tokens.attention_mask, SEQUENCE_LENGTH);
    let inputTensor = new ort.Tensor("int64", new BigInt64Array(paddedInputIds.map(BigInt)), [1, SEQUENCE_LENGTH]);
    let attentionTensor = new ort.Tensor("int64", new BigInt64Array(paddedAttentionMask.map(BigInt)), [1, SEQUENCE_LENGTH]);
    let outputs = await session.run({
      "input_ids": inputTensor,
      "attention_mask": attentionTensor
    });
    datasetEmbeddings[item.question] = meanPooling(outputs);
  }
}

async function loadModel() {
  session = await ort.InferenceSession.create("/assets/models/chatbot-model.onnx");
  await loadTokenizer();
  await loadDataset();
  await computeDatasetEmbeddings();
  let inputField = document.getElementById("user-input");
  if (inputField) {
    inputField.disabled = false;
  } else {
    console.error("Error: #user-input not found in index.html!");
  }
}

loadModel();

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

async function sendMessage() {
  let inputField = document.getElementById("user-input");
  let chatBox = document.getElementById("chat-box");
  let userMessage = inputField.value.trim();
  if (!userMessage) return;
  chatBox.innerHTML = "";
  let response = await getResponse(userMessage);
  let botMessage = document.createElement("p");
  botMessage.classList.add("bot-message");
  botMessage.textContent = response;
  chatBox.appendChild(botMessage);
  inputField.value = "";
}

async function getResponse(userInput) {
  let tokens = await tokenize(userInput);
  let paddedInputIds = padOrTruncate(tokens.input_ids, SEQUENCE_LENGTH);
  let paddedAttentionMask = padOrTruncate(tokens.attention_mask, SEQUENCE_LENGTH);
  let inputTensor = new ort.Tensor("int64", new BigInt64Array(paddedInputIds.map(BigInt)), [1, SEQUENCE_LENGTH]);
  let attentionTensor = new ort.Tensor("int64", new BigInt64Array(paddedAttentionMask.map(BigInt)), [1, SEQUENCE_LENGTH]);
  let outputs = await session.run({
    "input_ids": inputTensor,
    "attention_mask": attentionTensor
  });
  let embedding = meanPooling(outputs);
  return findBestMatch(embedding);
}
