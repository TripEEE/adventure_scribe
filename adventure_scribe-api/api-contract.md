// Login/Register Page

REGISTER

POST /register req: { username: "users_name", password: "users_password", email: "users_email" }

POST /login req: { password: "users_password", email: "users_email" }

// User info to render in header

GET /me res: { id: "user_id", name: "user_name", email: "user_email", dm: "true/false" }

// Landing Page

GET /campaigns returns an array of campaigns

resp: { campaigns: [ { id: "id" //unique value title: "campaign_name" }, { id: "id" //unique value title: "campaign_name" }, ... ] }

POST /campaigns campaign id (for create new)

req: { campaign: { id: "campaign_id" campaignTitle: "title", map: "map_link", mapTitle: "map_title", } }

// Campaign Page 1 grab the specific campaign with :id

GET /campaign/:id res: { map: { image: "map_image", title: "map_title" }, markers: [ { title: "marker_title", //leaflet will likely dictate how the database will be structured on marker coordinates location { x: "NUMBER", y: "NUMBER" } } ] }

POST /campaign/:campaign_id/markers req: { id: "marker_id", title: "marker_title", location { x: "NUMBER", y: "NUMBER" } }

// Campaign Page 2

GET /campaign/:campaign_id/markers/:marker_id res: { notes: [ { id: "note_id", title: "note_title", description: "note_description" } ], }

POST /campaign/:campaign_id/markers/:marker_id req: { id: "note_id", title: "note_title", description: "note_description" }

//Invite people to a campaign

POST /invite req: { id: campaign_id, emails: [ email1, email2, ... ] }
