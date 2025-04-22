var socket = io();
var data;
var isInitTable = true;

var tableDevicesData = document.querySelector('.table-devices-data');
socket.on('devices-data', (msg) => {
    data = msg;
    // console.log(data);
    // console.log(data);
    data.forEach(device => {
        var classPrefix = device.name.toLowerCase();
        if(isInitTable){
            var html;
            html = `
            <tr class="${classPrefix}-row">
                <td id="${classPrefix}-devices" class="${classPrefix}-data">${device.name}</td>
                <td id="${classPrefix}-type" class="${classPrefix}-data">${device.type}</td>
                <td id="${classPrefix}-broker" class="${classPrefix}-data">${device.broker}</td>
                <td id="${classPrefix}-topic" class="${classPrefix}-data">${device.topic}</td>
                <td id="${classPrefix}-status" class="${classPrefix}-data"><span><i data-feather="x-circle" class="offline-icon"></i></span></td>
            </tr>
            `
            if(html){
                tableDevicesData.innerHTML+=html;
                feather.replace();
            }
        }
        else{
            var rowDataHTML = document.querySelector(`.${classPrefix}-row`)
            // console.log(rowDataHTML);
            if(!rowDataHTML){
                html =`
                    <tr class="${classPrefix}-row">
                        <td id="${classPrefix}-devices" class="${classPrefix}-data">${device.name}</td>
                        <td id="${classPrefix}-type" class="${classPrefix}-data">${device.type}</td>
                        <td id="${classPrefix}-broker" class="${classPrefix}-data">${device.broker}</td>
                        <td id="${classPrefix}-topic" class="${classPrefix}-data">${device.topic}</td>
                        <td id="${classPrefix}-status" class="${classPrefix}-data"><span><i data-feather="x-circle" class="offline-icon"></i></span></td>
                    </tr>
                `
                tableDevicesData.innerHTML+=html;
                feather.replace();
            }
            else{
                document.getElementById(`${classPrefix}-type`).textContent = device.type;
                document.getElementById(`${classPrefix}-broker`).textContent = device.broker;
                document.getElementById(`${classPrefix}-topic`).textContent = device.topic;
            }
        }
    });
    isInitTable = false;
    // console.log(html);
    // feather.replace();

});

socket.on('devices-status', (msg) =>{
    // console.log(msg);
    var obj = msg;
    obj.forEach(device => {
        var html = ''
        // console.log(device);
        var statusHTML = document.querySelector(`#${device.name}-status`)
        if(statusHTML){
            if(device.status == 2)
                html += `<span><i data-feather="check-circle" class="online-icon"></i></span>`
            else{
                html += `<span><i data-feather="x-circle" class="offline-icon"></i></span>`
            }
            statusHTML.innerHTML = html;
            feather.replace();
        }

        
    });
});