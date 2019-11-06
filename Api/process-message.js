const Dialogflow = require('dialogflow');
const Pusher = require('pusher');



const projectId = 'xxxx';
const sessionId = 'xxx';
const languageCode = 'xxx';

const config = {
  credentials: {
    private_key: 'xxx',
    client_email: 'xxx',
  },
};

const pusher = new Pusher({
  appId: 'xxx',
  key: 'xxx',
  secret: 'xxx',
  cluster: 'xxx',
  encrypted: true,
});

const sessionClient = new Dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const processMessage = message => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode,
      },
    },
  };
  console.log(processMessage)
  sessionClient
    .detectIntent(request)
    .then(responses => {
      const result = responses[0].queryResult;
      return pusher.trigger('bot', 'bot-response', {
        message: result.fulfillmentText,
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
};

module.exports = processMessage;
