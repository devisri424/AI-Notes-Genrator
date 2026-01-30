from flask import Flask,request,jsonify
from flask_cors import CORS
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key=os.getenv("GEMINI_API_KEY")
client=genai.Client(api_key=api_key)

# model=genai.TextGenerationModel.from_pretrained("gemini-pro",api_key=api_key)
app=Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "AI notes Generator Backend Running"

@app.route("/generate",methods=["POST"])
def generate_notes():
    data=request.json
    topic=data.get("topic")
    if not topic:
        return jsonify({"error":"Topic is required"}), 400
    prompt=f"Generate short,clear, and well-structured study notes for topic:\n{topic}"
    try:
        response=client.models.generate_content(model="gemini-2.5-flash",contents=prompt)

        return jsonify({"notes":response.text})
    except Exception as e:
        return jsonify({"error":str(e)}),500

if __name__ == "__main__":
    app.run(debug=True)