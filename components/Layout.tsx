import Gtag from './gtag'

export default function Layout(props) {
  return (
    <div className={"container animate-fade-in min-h-screen"}>
      <Gtag></Gtag>
      {props.children}
    </div>
  )
}
