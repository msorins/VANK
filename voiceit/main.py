import os
import json
import urllib
import argparse
from libs.VoiceIt import *
from pydub import AudioSegment

class VoiceChat():
    def __init__(self, credentials_path, use_mp4, audio_path):
        # Initialise credentials 
        credentials     = json.load(open(credentials_path, 'r'))
        self.Voice      = VoiceIt(credentials['user_key'])
        self.usr        = credentials['usr']
        self.pwd        = credentials['pwd']
        self.mp4        = use_mp4
        self.audio_path = audio_path

    def get_url_templates(self):
        # Url templates from a predefined path. Wav format required.
        return ['recordings/training/%s' % f for f in os.listdir('recordings/training/') if 'rec' in f]

    def auth_audio_process_path(self, file_format='mp4'):
        # Downloads facebook audio from given url and the desired format which is defaulted to 'mp4'
        raw_audio_path = 'recordings/auth/confirmation.%s' % file_format
        urllib.request.urlretrieve (self.audio_path, raw_audio_path)

        return raw_audio_path if self.mp4 else convert_to_format(raw_audio_path, 'recordings/auth')


    def convert_to_format(path_from, path_to, file_format='wav'):
        # Converts audio file at given 'path_from' to a 'file_format' file found at 'path_to'.
        sound = AudioSegment.from_file(path_from, file_format)
        export_path = path_to + '/' + 'confirmation.%s' % file_format
        sound.export(path_to, format="wav")

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

    def authenticate(self):
        # Authentication validation.   
        print('-----------------')
        print('User authentication')
        print('-----------------')

        auth_audio_path = self.auth_audio_process_path()

        print('Authenticating with audio file from %s' % auth_audio_path)
        print('-----------------')

        return self.Voice.authentication(self.usr, self.pwd, auth_audio_path, "en-US")
        
     
if __name__ == '__main__':  

    parser = argparse.ArgumentParser(description='Pass on arguments for authentication.')
    parser.add_argument('audio_path', type=str, help='Path to the user authentication audio')
    parser.add_argument('-enroll', type=bool, default=False, help='True - enrolls sessions in recordings/train, False - (Default), authenticates model.')
    parser.add_argument('-credentials', type=str, default='credentials.json', help='Path to credentials.json') 
    parser.add_argument('-use_mp4', type=bool, default=True, help='True (Default) - MP4 audio file for authenticating the user. False - WAV') 

    args = parser.parse_args()

    voice = VoiceChat(args.credentials, args.use_mp4, args.audio_path)

    if args.enroll:
        voice.create_templates()

    response = voice.authenticate()

    print(response)