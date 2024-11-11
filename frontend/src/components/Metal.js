import Footer from '../components/Footer'
import React from 'react';

function Metal() {
  return (
    <div className="scrap-page">
      <h1>Metallic Scrap</h1>
      <p><strong>Potential Dangers:</strong> Metallic scrap, particularly from certain alloys, can contain harmful substances like cadmium and lead. Improper disposal can also cause environmental damage.</p>
      <p><strong>Disposal Methods:</strong> Metals can be recycled into new metal products or re-smelted for further use. It is essential to separate metal scrap based on its type (ferrous vs non-ferrous) for optimal recycling.</p>
      <p><strong>Procurement:</strong> Metallic scrap is generally sourced from discarded metal products like old machinery, vehicles, appliances, and industrial equipment.</p>
      <p><strong>Management:</strong> Proper management of metallic scrap involves sorting, safe storage, and transport to recycling facilities that specialize in specific types of metal recycling.</p>
      <Footer/>
    </div>
  );
}

export default Metal;

