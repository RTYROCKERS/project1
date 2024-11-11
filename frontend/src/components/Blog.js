import React from 'react'
import {Link} from 'react-router-dom'

export default function Blog() {
  return (
    <div className='blog-container'>
        <h1 className='blog-head'>Want to know more about scraps </h1>
            <div className='blog-scraps'>
                <div className="blog-card mt-3" style={{ "width": "18rem", "maxHeight": "360px", "fontFamily": "Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>
                    <img src="https://media.istockphoto.com/id/824699446/photo/recycling-trashcan-with-household-and-appliances-3d-rendering-isolated-on-white-background.jpg?s=1024x1024&w=is&k=20&c=rgTS3bmp_uT_MVEwWcJxIBxcDaPDT1mv5g6RLIvTfwU=" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Electronics scrap</h5>
                        <p className='blog-para'>Electronic scrap, or e-waste, includes discarded electronic devices and components, such as computers, phones, and batteries, which contain valuable materials like gold, silver, and copper.</p>
                        
                        <Link class="navbar-brand fs-6 fw-bold fst-bold" to="/electronicScraps"><i className='blog-det'>know more...</i></Link>
                        
                    </div>
                </div>
                <div className="blog-card mt-3" style={{ "width": "18rem", "maxHeight": "360px", "fontFamily": "Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>
                    <img src="https://images.unsplash.com/photo-1620676524838-7017c424120e?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Glass waste</h5>
                        <p className='blog-para'>Glass waste consists of discarded glass materials, such as bottles, windows, and containers, which are non-biodegradable but 100% recyclable.</p>
                        <div className='container w-100'>
                            <Link class="navbar-brand fs-6 fw-bold fst-bold" to="/glassWaste"><i className='blog-det'>know more...</i></Link>
                        </div>
                    </div>
                </div>
                <div className="blog-card mt-3" style={{ "width": "18rem", "maxHeight": "360px", "fontFamily": "Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>
                    <img src="https://images.unsplash.com/photo-1536842409491-b3bbde0e3b66?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Metallic scraps</h5>
                        <p className='blog-para'>
                        Metallic scrap includes discarded metal items like old vehicles, appliances, and construction materials. Recycling metal conserves natural resources, reduces energy use, and minimizes environmental impact.</p>
                        <div className='container w-100'>
                            <Link class="navbar-brand fs-6 fw-bold fst-bold" to="/metalWaste"><i className='blog-det'>know more...</i></Link>
                        </div>
                    </div>
                </div>
                <div className="blog-card mt-3" style={{ "width": "18rem", "maxHeight": "360px", "fontFamily": "Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>
                    <img src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">plastic scraps</h5>
                        <p className='blog-para'>Plastic waste includes discarded plastic items such as bottles, bags, and packaging, which take hundreds of years to decompose. Recycling and reusing plastic helps reduce pollution and conserves resources.</p>
                        <div className='container w-100'>
                            <Link class="navbar-brand fs-6 fw-bold fst-bold" to="/plasticWaste"><i className='blog-det'>know more...</i></Link>
                        </div>
                    </div>
                </div>
                <div className="blog-card mt-3" style={{ "width": "18rem", "maxHeight": "360px", "fontFamily": "Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>
                    <img src="https://images.unsplash.com/photo-1632667226262-3f341ec5afff?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">wooden scraps</h5>
                        <p className='blog-para'>Wood scrap consists of leftover wood from construction, furniture, and packaging. It can be recycled or repurposed into products like mulch, particleboard, or biofuel, reducing waste and supporting sustainable practices.</p>
                        <div className='container w-100'>
                            <Link class="navbar-brand fs-6 fw-bold fst-bold" to="/woodenWaste"><i className='blog-det'>know more...</i></Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
  )
}
