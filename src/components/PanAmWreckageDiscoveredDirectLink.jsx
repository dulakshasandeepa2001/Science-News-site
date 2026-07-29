import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const PanAmWreckageDiscoveredDirectLink = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/article/pan-am-wreckage-discovered')}
      variant="outline"
      className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      Read about Wreckage of Pan Am Aircraft Discovered on Ocean Floor After 74 Years
    </Button>
  );
};

export default PanAmWreckageDiscoveredDirectLink;
