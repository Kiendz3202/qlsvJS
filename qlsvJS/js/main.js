function checkEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function save(){
    let fullname = document.getElementById("fullname").value
    let email = document.getElementById("email").value
    let phone = document.getElementById("phone").value
    let address = document.getElementById("address").value
    let gender = ''
    if(document.getElementById('male').checked){
        gender = document.getElementById('male').value;
    }else if(document.getElementById('female').checked){
        gender = document.getElementById('female').value;
    }

    if (_.isEmpty(fullname)){
        fullname = ''
        document.getElementById("fullname-error").innerHTML = "vui long nhap lai"
    }else if(fullname.length<=2){
        fullname = ''
        document.getElementById("fullname-error").innerHTML = "nhap hon 2 ky tu"
    }else{
        document.getElementById("fullname-error").innerHTML = ""
    }

    if(_.isEmpty(email)){
        email = ''
        document.getElementById("email-error").innerHTML = "vui long nhap dung email"
    }else if(!checkEmail(email)){
        email = ''
        document.getElementById("email-error").innerHTML = "nhap dung dinh dang email"
    }else{
        document.getElementById("email-error").innerHTML = ""
    }

    if(_.isEmpty(phone)){
        phone = ''
        document.getElementById("phone-error").innerHTML = "Vui long nhap so dien thoai"
    }else{
        document.getElementById("phone-error").innerHTML = ""
    }

    if(_.isEmpty(address)){
        address = ''
        document.getElementById("address-error").innerHTML = "vui long nhap dia chi"
    }else{
        document.getElementById("address-error").innerHTML = ""
    }

    if(_.isEmpty(gender)){
        gender = ''
        document.getElementById("gender-error").innerHTML = "chon gioi tinh"
    }else{
        document.getElementById("gender-error").innerHTML = ''
    }

    if(fullname && email && phone && address && gender){
        let students1 = localStorage.getItem('students1') ? JSON.parse(localStorage.getItem('students1')) : [];

        students1.push({
            fullname: fullname,
            email: email,
            phone: phone,
            address: address,
            gender: gender
        });
        
        localStorage.setItem('students1', JSON.stringify(students1));

        this.renderListStudent();
        
    }
}

function renderListStudent(){

    let students1 = localStorage.getItem('students1') ? JSON.parse(localStorage.getItem('students1')) : [];
    if(students1.length === 0) return false;
    
    let tableContent = `
       <tr>
        <td>STT</td>
        <td>Họ và Tên</td>
        <td>Email</td>
        <td>Điện thoại</td>
        <td>Giới tính</td>
        <td>Địa chỉ</td>
        <td>Hành động</td>
       </tr>
        `

        students1.forEach((student, index) => {
            let studentId = index;
            // index++;
            let genderLabel = student.gender == 1 ? 'Nam' : 'Nữ';

            tableContent += `<tr>
            <td>${index}</td>
            <td>${student.fullname}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${genderLabel}</td>
            <td>${student.address}</td>
            <td>
              <a href="#">Edit</a> | <a href="#" onclick="deleteStudent(${studentId})">Delete</a>
            </td>
        </tr>`
        })

        document.getElementById("grid-students").innerHTML = tableContent;
}

function deleteStudent(id){
    let students1 = localStorage.getItem('students1') ? JSON.parse(localStorage.getItem('students1')) : [];
    students1.splice(id,1);
    localStorage.setItem('students1',JSON.stringify(students1));
    renderListStudent();
}