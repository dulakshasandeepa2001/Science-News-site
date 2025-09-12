import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const MarsLifeDiscoveryDirectLink = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/article/mars-life-discovery')}
      variant="outline"
      className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      Read about Potential Life Discovery on Mars
    </Button>
  );
};

export default MarsLifeDiscoveryDirectLink;
