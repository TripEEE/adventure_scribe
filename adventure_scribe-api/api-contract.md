// Login/Register Page


REGISTER


POST /register
req: {
  username: "users_name",
  password: "users_password",
  email: "users_email"
}


POST /login
req: {
  password: "users_password",
  email: "users_email"
}


// User info to render in header


GET /me
res: {
  id: "user_id",
  name: "user_name",
  email: "user_email",
  dm: "true/false"
}


// Landing Page


GET /campaigns
returns an array of campaigns


resp: {
  campaigns: [
      {
        id: "id" //unique value
        name: "campaign_name"
      },
      {
        id: "id" //unique value
        name: "campaign_name"
      },
      ...
    ]
}


POST /campaigns
campaign id (for create new)

req: {
  campaign: {
    name: "campaign_name"
    map: {
       name: "mapname",
       link: "maplink"
    }
  }
}


// Campaign Page 1
grab the specific campaign with :id


GET /campaign/:id 
res: {
  map: {
    image: "map_image",
    name: "map_title"
  },
  markers: [
    {
      name: "marker_title",
      //leaflet will likely dictate how the database will be structured on marker coordinates
      location: ""
    }
  ]
}


POST /campaign/:campaign_id/markers
req: {
  name: "marker_title",
  location: ""
}

// Campaign Page 2

GET /campaign/:campaign_id/markers/:marker_id
res: {
  notes: [
    {
      id: "note_id",
      title: "note_title",
      description: "note_description"
    }
  ],
} 

POST /campaign/:campaign_id/markers/:marker_id/notes
req: {
  id: "note_id",
  title: "note_title",
  description: "note_description",
  category: "category_type"
}

//Invite people to a campaign

POST /invite
  req: {
    id: campaign_id,
    emails: [
      email1,
      email2,
      ...
    ]
  }
