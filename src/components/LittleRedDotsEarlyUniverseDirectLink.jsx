import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const LittleRedDotsEarlyUniverseDirectLink = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/article/little-red-dots-early-universe')}
      variant="outline"
      className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      Read about What Are the Mysterious 'Little Red Dots' from the Early Universe?
    </Button>
  );
};

export default LittleRedDotsEarlyUniverseDirectLink;
