from transformers import Wav2Vec2Model, Wav2Vec2Processor
import torch 
import librosa
import torch.nn.functional as F
import numpy as np

processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-base-960h")
model = Wav2Vec2Model.from_pretrained("facebook/wav2vec2-base-960h")
model.eval()  # inference mode

def extract_features(audio_path):
    signal,sr = librosa.load(audio_path,sr=16000)
    inputs = processor(signal,return_tensors="pt", sampling_rate=16000)

    with torch.no_grad():
        outputs = model(**inputs)
    
    embedding = torch.mean(outputs.last_hidden_state, dim=1)
    return embedding.squeeze()

def compare_embeddings(emb1, emb2):
    similarity = F.cosine_similarity(emb1, emb2, dim=0).item()
    return similarity

def similarity_score(path1, path2):
    embedding1 = extract_features(path1)
    embedding2 = extract_features(path2)

    similarity_score = compare_embeddings(embedding1, embedding2)* 100
    return round(similarity_score, 2)


def get_pitch_curve(path,sr=22050 , fmin=80.0 , fmax=10000.0):
    y,_ = librosa.load(path,sr=sr)

    pitches = librosa.yin(y, sr=sr, fmin=fmin, fmax=fmax)
    times  = librosa.times_like(pitches, sr=sr)
    return pitches, times


def pitch_accuracy_score(ref_path, user_path, threshold_cents=50):
    t_ref, p_ref = get_pitch_curve(ref_path)
    t_usr, p_usr = get_pitch_curve(user_path)

    min_len = min(len(p_ref), len(p_usr))
    correct = 0

    for i in range(min_len):
        if p_ref[i] <= 0 or p_usr[i] <= 0:
            continue  # skip unvoiced frames

        # Convert Hz difference to cents
        diff_cents = 1200 * np.log2(p_usr[i] / p_ref[i])
        if abs(diff_cents) < threshold_cents:
            correct += 1

    score = correct / min_len * 100
    return round(score, 2)

def extract_pitch_series(audio_path, sr=16000, hop_length=512):
    y, sr = librosa.load(audio_path, sr=sr)
    
    pitches, magnitudes = librosa.piptrack(y=y, sr=sr, hop_length=hop_length)
    pitch_values = []

    # Extract the pitch with highest energy per frame
    for i in range(pitches.shape[1]):
        index = magnitudes[:, i].argmax()
        pitch = pitches[index, i]
        pitch_values.append(pitch if pitch > 0 else 0)  # Replace 0 if needed

    times = librosa.frames_to_time(np.arange(len(pitch_values)), sr=sr, hop_length=hop_length)

    return times.tolist(), pitch_values