import { useEffect } from "react";
import home from "../assets/home.css";
export default function Home() {
  useEffect(()=>{
    fetch('http://localhost:3001/get')
    .then(res=>{
      let data=res.json();
      console.log(data);    
    });
    
  })
  return(
    <div class="bgd">
  <div class="homePage">Coming soon</div>
  </div>
  );
}
