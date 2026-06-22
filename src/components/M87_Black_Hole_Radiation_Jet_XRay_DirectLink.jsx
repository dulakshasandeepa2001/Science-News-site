import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const M87_Black_Hole_Radiation_Jet_XRay_DirectLink = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/article/m87-black-hole-radiation-jet-xray')}
      variant="outline"
      className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      Read about New Details Captured from M87 Black Hole Radiation Jet
    </Button>
  );
};

export default M87_Black_Hole_Radiation_Jet_XRay_DirectLink;
