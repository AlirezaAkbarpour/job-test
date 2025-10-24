import ReactPlayer from 'react-player'
import './VideoBg.css'

const VideoBackground = () => {
    return (
        <div className='video-container'>
            <ReactPlayer 
                src="/Digen_video_1761311053969.mp4"
                playing
                loop
                muted
                width="100%"
                height="100%"
                className="video-bg object-cover"
            />
            <div className='overlay'>
                <h1 className='flex items-center w-full mx-8 text-slate-100'>A Wise QUOTE <hr className='mx-4'/> </h1>
                <h2 className='text-start ml-12'>Get EveryThing You Want</h2>
                <h3 className='text-start text-balance ml-12 text-slate-400'>You can get everything you want if you work hard, trust the process, and stick to the plan
                </h3>
            </div>
        </div>
    )
}

export default VideoBackground;