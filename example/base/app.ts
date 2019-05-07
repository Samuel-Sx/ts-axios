import Axios from "../../src";

Axios({
    url: '/base/get',
    params:{
        foo:'bar' 
    }
})

Axios({
    url: '/base/get',
    params:{
        foo:['foo', 'bar'] 
    }
})

Axios({
    url: '/base/get#123db',
    params:{
        foo:'@$: '
    }
})