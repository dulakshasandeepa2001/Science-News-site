import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const MilitaryDroneMotherShipDirectLink = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/article/military-drone-mothership')}
      variant="outline"
      className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      Read about Military Drone Mother Ship Testing
    </Button>
  );
};

export default MilitaryDroneMotherShipDirectLink;