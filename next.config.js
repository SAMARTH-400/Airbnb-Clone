module.exports = {
    images: {
        domains: ["links.papareact.com" , "lp-cms-production.imgix.net" , "images.unsplash.com" ]
    },
    env: {
        mapbox_access_key: "pk.eyJ1Ijoic3RvbmVyYm90IiwiYSI6ImNrczdweGc0czBtMnoycG10MDR6aGI5Z28ifQ.XvItc2HZjZPOmGmblGXkKw",
        mapbox_style_url:  "mapbox://styles/stonerbot/cks7q8fx60x5x17o326nj1o6p",
        stripe_public_key: process.env.STRIPE_PUBLISHABLE_KEY
    }
}