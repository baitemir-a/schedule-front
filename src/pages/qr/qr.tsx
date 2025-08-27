import { Link } from "react-router-dom";

export default function QrPage() {
  return (
    <div>
      <div><Link to={'/scan'}>scan qr</Link></div>
      <div><Link to={'/generate'}>generate qr</Link></div>
      <div>profile</div>
    </div>
  )
}