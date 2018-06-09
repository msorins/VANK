import os
import json
import urllib
import argparse
from VoiceIt import *
from pydub import AudioSegment

class VoiceChat():
    def __init__(self, credentials_path):
        # Initialise credentials 
        credentials = json.load(open(credentials_path, 'r'))
        self.Voice = VoiceIt(credentials['user_key'])
        self.usr = credentials['usr']
        self.pwd = credentials['pwd']

    def get_url_templates(self):
        # Url templates from a predefined path. Wav format required.
        return ['recordings/training/%s' % f for f in os.listdir('recordings/training/') if 'rec' in f]

    def auth_audio_process_path(self, url, file_format='mp4'):
        # Downloads facebook audio from given url and the desired format which is defaulted to 'mp4'
        raw_audio_path = 'recordings/auth/confirmation.%s' % file_format
        urllib.request.urlretrieve (url, raw_audio_path)
        sound = AudioSegment.from_file(raw_audio_path, file_format)

        export_path = "recordings/auth/confirmation.wav"
        sound.export(export_path, format="wav")
        return export_path

    def check_user(self):
        # Checks user status
        return self.Voice.getUser(self.usr, self.pwd)

    def create_templates(self):
        # Create the 3 comparison enrollments
        print('-----------------')
        print('Enrolling training recordings')
        print('-----------------')
        templates = self.get_url_templates()
        for url in templates:
            response = self.Voice.createEnrollment(self.usr, self.pwd, os.getcwd() + '/' + url, "en-US")
            print(response)

    def delete_templates(self):
        # Delete all sessions related to an user.
        print('-----------------')
        print('Deleting all user enrollments')
        print('-----------------')
        response = self.Voice.getEnrollment(self.usr, self.pwd)
        [self.Voice.deleteEnrollment(self.usr, self.pwd, str(s)) for s in json.loads(response)['Result']]

    def authenticate(self, auth_audio_url):
        # Authentication validation.   
        print('-----------------')
        print('User authentication')
        print('-----------------')
        auth_audio_path = self.auth_audio_process_path(auth_audio_url)
        return self.Voice.authenticationByWavURL(self.usr, self.pwd, auth_audio_path, "en-US")
        
     
if __name__ == '__main__':  

    parser = argparse.ArgumentParser(description='Pass on arguments for authentication.')
    parser.add_argument('audio_path', type=str, help='Path to the user authentication audio')
    parser.add_argument('-enroll', type=bool, default='False', help='True - enrolls sessions in recordings/train, False - Default, authenticates model.')
    #parser.add_argument('-credentials', type=str, default='credentials.json', help='Path to credentials.json') 

    args = parser.parse_args()

    voice = VoiceChat('credentials.json')

    if parser.parse_args(['enroll']):
        voice.create_templates()

    response = voice.authenticate(args.audio_path)

    print(response)