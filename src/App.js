import React, { Component } from 'react';
import './App.css';
import Customer from "./components/Customer";

const customers = [{
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': '홍길동',
  'birth': '960113',
  'gender': '남자',
  'job': '대학생'
},
{
  'id': 2,
  'image': 'https://placeimg.com/64/64/2',
  'name': '이상민',
  'birth': '960313',
  'gender': '남자',
  'job': '게이머'
},
{
  'id': 3,
  'image': 'https://placeimg.com/64/64/3',
  'name': '홍',
  'birth': '961113',
  'gender': '남자',
  'job': '대학생'
}
]

class App extends Component {
  render() {
    return (
      <div>
        {
          customers.map(c=>{
            return <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birth={c.birth}
              gender={c.gender}
              job={c.job}
            ></Customer>
          })
        }
      </div>
    );
  }
}
export default App;
