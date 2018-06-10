## Notes

Connctivity credentials in credentials.json
Main authentication script in main.py

python main.py [audio_path] [-enroll]

audio_path (str) - url to the user's recorded audio__
-enroll   (bool) - True - rebuilds training samples, False (default) - classifies audio file from audio_path__

key phrase = 'a perfect day really makes me happy'

/recordings/training - at least 3 recordings of the user's voice pronouncing the key phrase__
/recordings/auth     - new recording gets dumped here and converted to .wav. It is the processed by main.py__