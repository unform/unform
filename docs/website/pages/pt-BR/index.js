/** @jsx jsx */

/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */

// eslint-disable-next-line import/no-extraneous-dependencies
const React = require('react');

const { jsx } = require('benefit/react');
const { FaRocket, FaCode, FaHeart, FaCubes } = require('react-icons/fa')

const features = [
  {
    icon: <FaRocket className="text-purple-500" size={36} />,
    title: 'Foco em perfomance'
  },
  {
    icon: <FaCode className="text-blue-500" size={36} />,
    title: 'Sintaxe elegante'
  },
  {
    icon: <FaHeart className="text-red-500" size={36} />,
    title: 'React Hooks'
  },
  {
    icon: <FaCubes className="text-indigo-500" size={36} />,
    title: 'Integrações'
  },
]

const Button = ({ children, href, disabled }) => (
  <a href={href} title={disabled && 'Soon™'} className={`rounded ${disabled && 'cursor-not-allowed opacity-50'} text-${disabled ? 'gray' : 'red'}-500 p-1 px-2 mx-2 border border-${disabled ? 'gray' : 'red'}-500 hover:bg-${disabled ? 'gray' : 'red'}-500 hover:text-white`}>
    {children}
  </a>
)

function Index(props) {
  const { config: siteConfig, language = '' } = props;
  const { baseUrl, docsUrl } = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = `${baseUrl}${docsPart}${langPart}`;

  return (
    <div className="container mx-auto p-8 flex flex-1 flex-col justify-center align-center text-center">
      <img src={`${baseUrl}img/logo.png`} alt="Logo" className="object-contain h-18" />
      <p className="text-2xl font-bold mt-6">Uncontrolled forms para ReactJS</p>

      <div className="mt-4">
        <Button href={`${docUrl}installation`}>Documentação</Button>
        <Button disabled href="#">Exemplos</Button>
      </div>
      <div className="features mt-12 flex flex-wrap">
        {features.map(f => (
          <div key={f.title} className="rounded m-3 flex flex-1 flex-col items-center justify-center p-6 text-xl text-gray-800 font-bold">
            {f.icon}
            <p className="mt-2">{f.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

module.exports = Index;
