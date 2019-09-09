/*eslint-disable*/
function add0(m){return m<10?'0'+m:m }
export function formatDate(timeStamp,type){

    //shijianchuo是整数，否则要parseInt转换
        timeStamp = parseInt(timeStamp) === NaN ? 0 : parseInt(timeStamp)
        var time = new Date(timeStamp);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        if(type === 'mm-dd'){
            return add0(m)+'.'+add0(d);
        }
        if(type && type.split(' ').length === 1 && type.indexOf('yy') != -1){
            //只有一个字符串  
            return y
                    +type.match(/yy(\S*)mm/)[1]
                    +add0(m)
                    +type.match(/mm(\S*)dd/)[1]
                    +add0(d)
                    +type.match(/dd(\S*)/)[1];
        }
        if(type){
            return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
        }else{
            return y+'.'+add0(m)+'.'+add0(d);
        }
        // return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);

}

export function timeStampToHour(timeStamp,type){
    // 时间戳转换 时分秒
    timeStamp = isNaN(timeStamp) ? 0 : parseInt(timeStamp);
    if(timeStamp<=0){
        return '';
    }
    var hour = add0(parseInt(timeStamp/(1000*60*60),10));
    var minute = add0(parseInt((timeStamp%(1000*60*60))/(1000*60),10));
    var sec = add0(parseInt((timeStamp%(1000*60*60)%(1000*60))/(1000),10));

    return hour+'小时'+minute+'分';
}
