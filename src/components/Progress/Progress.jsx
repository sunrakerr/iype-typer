import './Progress.css';
let progress = ({bgcolor,progress,height}) => {
        const Parentdiv = {
            height: height,
            width: '100%',
            backgroundColor: 'whitesmoke',
            borderRadius: 40,
          }
          
          const Childdiv = {
            height: '100%',
            width: `${progress}%`,
            backgroundColor: bgcolor,
            borderRadius:40,
            textAlign: 'right'
          }
          
          const progresstext = {
            padding: 10,
            color: 'black',
            fontWeight: 900
          }
            
        return (
        <div style={Parentdiv}>
          <div style={Childdiv}>
            
          </div>
        </div>
        )
}

export default progress;