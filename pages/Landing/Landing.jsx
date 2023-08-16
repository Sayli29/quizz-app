import { Button, ButtonGroup } from '@chakra-ui/react'
const Landing = ({session, handleClick}) => {
    if (!session) {
    return (
      <>
        <Button colorScheme='blue' onClick={handleClick}>Button</Button>
      </>
      
    )
  }
  else {
    return (<div>Logged in!</div>)
  }
}

export default Landing;