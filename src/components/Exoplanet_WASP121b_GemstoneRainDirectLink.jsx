import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const Exoplanet_WASP121b_GemstoneRainDirectLink = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/article/exoplanet-wasp-121b-gemstone-rain')}
      variant="outline"
      className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      Read about Exoplanet WASP-121b: Where Rubies and Sapphires Rain Down
    </Button>
  );
};

export default Exoplanet_WASP121b_GemstoneRainDirectLink;
