import './Invite.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import client from '../../client';

function Invite(props) {
  const [email, setEmail] = useState("");

  const _inviteToCampaign = async (campaign_id, body) => {
    const resp = await client.inviteUserToCampaign(campaign_id, body);
    props.setSuccessTracker(true);
    props.setInvite(false);
    setTimeout(() => {
      props.setSuccessTracker(false);
    }, 2000);
  }

  return (
    <div className="d-flex align-items-end justify-content-end invDiv">
      <input type="text" className="editTitleFieldInvite" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}></input>
      <button type="button" className="btn btn-med btn-light" onClick={() => _inviteToCampaign(props.campaignID, [email])}><FontAwesomeIcon icon={faCheck} /></button>
      <button type="button" className="btn btn-med btn-light" onClick={() => props.setInvite(false)}><FontAwesomeIcon icon={faXmark} /></button>
    </div>
  )
}

export default Invite;