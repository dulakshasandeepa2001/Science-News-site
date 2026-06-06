import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const HumpbackWhalesSoundDiscoveryDirectLink = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/article/humpback-whales-sound-discovery')}
      variant="outline"
      className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      Read about Scientists Discovering Mysterious Humpback Whale Sound Patterns
    </Button>
  );
};

export default HumpbackWhalesSoundDiscoveryDirectLink;