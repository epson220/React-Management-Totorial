import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            file : null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : ''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer().then((response)=>{ //서버로부터 response가 건너오면
            console.log(response.data); //건너온 데이터를 출력
            this.props.stateRefresh();
        });
        this.setState({
            file : null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : ''
        });
        
    }

    handleFileChange = (e) => {
        this.setState({
            file : e.target.files[0], //state의 file값을 input태그의 값으로 변경
            fileName : e.target.value
        });
    }

    handleValueChange = (e) => {
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    
    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers : {
                'content-type' : 'multipart/form-data' //전달하고자하는 데이터에 파일이 포함되어있으므로 설정
            }
        }
        return post(url, formData, config); //서버로 데이터 전송
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input>
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}></input>
                생년월일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}></input>
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}></input>
                직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}></input>
                <button type="submit">추가하기</button>
            </form>
        );
    }
}

export default CustomerAdd;