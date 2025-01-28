import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faPerson } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div>
      <h1>안녕하세요.</h1>
      <FontAwesomeIcon
        icon={faThumbsUp}
        className="fa-fw text-4xl text-[#af0000] hover:text-[#000000]"
      />
      <FontAwesomeIcon icon={faPerson} className="fa-fw text-4xl" />
      <Button variant="outline">버튼</Button>
    </div>
  )
}
