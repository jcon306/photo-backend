const Clarifai = require('clarifai')

const returnClarifaiRequestOptions = (imageUrl) => {
    const PAT = '29d1dd42e0254ab6b5475844dcd77af9';

    const USER_ID = 'jcon306';       
    const APP_ID = 'face-detection-app';
 
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
});

const requestOptions  = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
    };
   return requestOptions
  }

const app = new Clarifai.App({
    apiKey: '8b5e869e5d4442a2a2fba50219ab70af' 
   });

const handleApiCall = (req, res) => {  
    app.models.predict('face-detection', req.body.input)
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
  } 

const handleImage =  (req, res, db) => {
    const { id } = req.body
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}