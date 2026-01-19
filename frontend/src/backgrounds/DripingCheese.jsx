function DripingCheese()
{
    return (
        <>
        <div className="drip-background">
            <div className="cont">
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
                </svg>
            </div>
        </div>
            <style>{`
                .drip-background {
                position: fixed;
                inset: 0;
                z-index: -1;
                pointer-events: none;
                }
                .cont{
                width:100%;
                height:100vh;
                position:relative;
                overflow:hidden;
                border-top:15px solid #f9c02e;
                border-bottom:15px solid #f9c02e;
                filter:url("#goo");
                box-shadow: 0 2px 10px rgba(0,0,0,0.5);
                }
                .cont .drip{
                height:30px;
                width:30px;
                border-radius: 50%;
                background:black;
                position:absolute;
                top:-100%;
                animation:falling 5s linear infinite;
                }
                @keyframes falling{
                0%{
                    top:-100%;
                }
                50%{
                    top:0%;
                }
                80%{
                    top:80%;
                }
                100%{
                    top:100%;
                }
                }
                .cont .drip:nth-child(1){
                border-color:#f9c02e;
                height:29px;
                width:29px;
                animation-delay: -0.2s;
                background:#f9c02e;
                left:173px;
                margin-left:60px;
                }
                .cont .drip:nth-child(2){
                border-color:#f9c02e;
                height:25px;
                width:25px;
                animation-delay: -0.4s;
                background:#f9c02e;
                left:76px;
                margin-left:60px;
                }
                .cont .drip:nth-child(3){
                border-color:#f9c02e;
                height:38px;
                width:38px;
                animation-delay: -0.6s;
                background:#f9c02e;
                left:96px;
                margin-left:60px;
                }
                .cont .drip:nth-child(4){
                border-color:#f9c02e;
                height:29px;
                width:29px;
                animation-delay: -0.8s;
                background:#f9c02e;
                left:24px;
                margin-left:60px;
                }
                .cont .drip:nth-child(5){
                border-color:#f9c02e;
                height:20px;
                width:20px;
                animation-delay: -1s;
                background:#f9c02e;
                left:93px;
                margin-left:60px;
                }
                .cont .drip:nth-child(6){
                border-color:#f9c02e;
                height:14px;
                width: 14px;
                animation-delay: -1.2s;
                background:#f9c02e;
                left:117px;
                margin-left:60px;
                }
                .cont .drip:nth-child(7){
                border-color:#f9c02e;
                height:5px;
                width:5px;
                animation-delay: -1.4s;
                background:#f9c02e;
                left:31px;
                margin-left:60px;
                }
                .cont .drip:nth-child(8){
                border-color:#f9c02e;
                height:2px;
                width:2px;
                animation-delay: -1.6s;
                background:#f9c02e;
                left:4px;
                margin-left:60px;
                }
                .cont .drip:nth-child(9){
                border-color:#f9c02e;
                height:2px;
                width:2px;
                animation-delay: -1.8s;
                background:#f9c02e;
                left:14px;
                margin-left:60px;
                }
                .cont .drip:nth-child(10){
                border-color:#f9c02e;
                height:16px;
                width:16px;
                animation-delay: -2s;
                background:#f9c02e;
                left:143px;
                margin-left:60px;
                }
                .cont .drip:nth-child(11){
                border-color:#f9c02e;
                height:11px;
                width:11px;
                animation-delay: -2.2s;
                background:#f9c02e;
                left:10px;
                margin-left:60px;
                }
                .cont .drip:nth-child(12){
                border-color:#f9c02e;
                height:4px;
                width:4px;
                animation-delay: -2.4s;
                background:#f9c02e;
                left:158px;
                margin-left:60px;
                }
                .cont .drip:nth-child(13){
                border-color:#f9c02e;
                height:18px;
                width:18px;
                animation-delay: -2.6s;
                background:#f9c02e;
                left:163px;
                margin-left:60px;
                }
                .cont .drip:nth-child(14){
                border-color:#f9c02e;
                height:4px;
                width:4px;
                animation-delay: -2.8s;
                background:#f9c02e;
                left:168px;
                margin-left:60px;
                }
                .cont .drip:nth-child(15){
                border-color:#f9c02e;
                height:13px;
                width:13px;
                animation-delay: -3s;
                background:#f9c02e;
                left:103px;
                margin-left:60px;
                }
                .cont .drip:nth-child(16){
                border-color:#f9c02e;
                height:40px;
                width:40px;
                animation-delay: -3.2s;
                background:#f9c02e;
                left:158px;
                margin-left:60px;
                }
                .cont .drip:nth-child(17){
                border-color:#f9c02e;
                height:27px;
                width:27px;
                animation-delay: -3.4s;
                background:#f9c02e;
                left:179px;
                margin-left:60px;
                }
                .cont .drip:nth-child(18){
                border-color:#f9c02e;
                height:13px;
                width:13px;
                animation-delay: -3.6s;
                background:#f9c02e;
                left:97px;
                margin-left:60px;
                }
                .cont .drip:nth-child(19){
                border-color:#f9c02e;
                height:23px;
                width:23px;
                animation-delay: -3.8s;
                background:#f9c02e;
                left:149px;
                margin-left:60px;
                }
                .cont .drip:nth-child(20){
                border-color:#f9c02e;
                height:20px;
                width:20px;
                animation-delay: -4s;
                background:#f9c02e;
                left:156px;
                margin-left:60px;
                }
            `}</style>
        </>
    )
}

export default DripingCheese;