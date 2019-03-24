import React from 'react';
import { Link } from 'react-router-dom';

export default function Index(props) {
  return (
    <ul>
      <li>
        <Link to="/line">line</Link>
      </li>
      <li>
        <Link to="/meter">meter</Link>
      </li>
      <li>
        <Link to="/tree">tree</Link>
      </li>
      <li>
        <Link to="/tree1">tree1</Link>
      </li>
      <li>
        <Link to="/map">map</Link>
      </li>
    </ul>
  )
}