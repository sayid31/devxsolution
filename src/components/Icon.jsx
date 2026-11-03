import { Code2, Cpu, Cloud, Smartphone, Wifi, Sparkles } from 'lucide-react';

const MAP = {
  code: Code2,
  cpu: Cpu,
  cloud: Cloud,
  smartphone: Smartphone,
  wifi: Wifi,
};

export default function Icon({ name, ...props }) {
  const Cmp = MAP[name] || Sparkles;
  return <Cmp {...props} />;
}
