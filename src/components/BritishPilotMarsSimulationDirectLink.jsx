import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const BritishPilotMarsSimulationDirectLink = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/article/british-pilot-mars-simulation')}
      variant="outline"
      className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      Read about British Pilot Joining Mars Simulation Mission
    </Button>
  );
};

export default BritishPilotMarsSimulationDirectLink;