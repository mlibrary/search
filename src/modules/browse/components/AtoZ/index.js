import React from 'react';

const AtoZ = () => {
  const startsWith = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  return (
    <section className="browse">
      <h2 className="browse-heading">Browse A-Z</h2>
      <ul className="browse-list">
      {startsWith.map((item, key) => (
        <li className="browse-item"><button className="browse-button button-light">{item}</button></li>
      ))}
      </ul>

      <a href="" className="underline">Browse all databases</a>
    </section>
  )
}

export default AtoZ
