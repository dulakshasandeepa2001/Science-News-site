import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const BritishParalympianJohnMcFallDirectLink = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/article/british-paralympian-john-mcfall-astronaut')}
      variant="outline"
      className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      Read about British Paralympian John McFall Becoming the First Disabled Astronaut
    </Button>
  );
};

export default BritishParalympianJohnMcFallDirectLink;