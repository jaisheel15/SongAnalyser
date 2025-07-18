from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from scoring import extract_pitch_series, pitch_accuracy_score , similarity_score



UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
CORS(app)

import traceback

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'reference' not in request.files or 'user' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    reference = request.files['reference']
    user = request.files['user']

    ref_path = os.path.join(UPLOAD_FOLDER, reference.filename)
    user_path = os.path.join(UPLOAD_FOLDER, user.filename)
    reference.save(ref_path)
    user.save(user_path)

    try:
        similarities_score = similarity_score(ref_path, user_path)
        pitch_score = pitch_accuracy_score(ref_path, user_path)

        ref_time, ref_pitch = extract_pitch_series(ref_path)
        user_time, user_pitch = extract_pitch_series(user_path)

        min_len = min(len(ref_pitch), len(user_pitch))
        pitch_diff = [abs(ref_pitch[i] - user_pitch[i]) for i in range(min_len)]
        times = ref_time[:min_len]

        print(f"Similarity: {similarities_score}, Pitch score: {pitch_score}")
        print(f"Pitch arrays lengths: ref={len(ref_pitch)}, user={len(user_pitch)}")

        return jsonify({
            'similarity_score': similarities_score,
            'pitch_score': pitch_score,
    'pitch_diff': [float(x) for x in pitch_diff],
    'times': [float(x) for x in times],
    'reference_pitch': [float(x) for x in ref_pitch[:min_len]],
    'user_pitch': [float(x) for x in user_pitch[:min_len]],
        }), 200

    except Exception as e:
        print("Error:", e)
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

    finally:
        if os.path.exists(ref_path):
            os.remove(ref_path)
        if os.path.exists(user_path):
            os.remove(user_path)


if __name__ == '__main__':
    app.run(debug=True)