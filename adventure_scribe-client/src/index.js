import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Application from './components/Application';
import client from './client'
import { AuthProvider } from './components/context/AuthProvider';

const myExampleFlow = async () => {
  await client.login('john.doe@gmail.com', 'test123!')
  await client.getCampaigns()

  const myNewCampaign = await client.createCampaign({
    campaign: {
      name: "My new campaign",
      map: {
        name: "map name",
        link: "my map link"
      }
    }
  })

  console.log({ myNewCampaign })

  const campaignAgain = await client.getCampaignById(myNewCampaign.id)

  await client.editCampaign({ ...myNewCampaign, title: "edited title" })
  await client.deleteCampaign(campaignAgain.id)
}

// myExampleFlow()






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <Application />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
