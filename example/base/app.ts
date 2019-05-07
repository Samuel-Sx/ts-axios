import Axios from "../../src";

Axios({
    url: '/base/get',
    method: 'POST',
    params:{
        foo:'bar' 
    }
})