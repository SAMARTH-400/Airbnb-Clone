import React from 'react'

function Footer() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 px-20 pt-10 pb-5 bg-gray-100 text-gray-600 justify-items-center">
            <div className="space-y-4 text-sm text-gray-800">
                <h5 className="font-bold">ABOUT</h5>
                <p>How AirBnb Works</p>
                <p>Newsroom</p>
                <p>Investors</p>
                <p>Airbnb Plus</p>
                <p>Airbnb Luxe</p>
            </div>
            <div className="space-y-4 text-sm text-gray-800">
                <h5 className="font-bold">COMMUNITY</h5>
                <p>Airbnb.org: disaster relief housing</p>
                <p>Support Afghan refugees</p>
                <p>Combating discrimination</p>
                <p>Look around</p>
            </div>
            <div className="space-y-4 text-sm text-gray-800">
                <h5 className="font-bold">HOST</h5>
                <p>Try Hosting</p>
                <p>AirCover for Hosts</p>
                <p>Explore hosting resources</p>
                <p>Visit our community forum</p>
                <p>How to host responsibly</p>
            </div>
            <div className="space-y-4 text-sm text-gray-800">
                <h5 className="font-bold">SUPPORT</h5>
                <p>Help Centre</p>
                <p>Air Cover</p>
                <p>Safety Informatioin</p>
                <p>Cancellation options</p>
                <p>Our COVID-19 Response</p>
            </div>
        </div>
    )
}

export default Footer
