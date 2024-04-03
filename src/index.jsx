import React from 'react';
import outline from 'react-outline'
import { createRoot } from 'react-dom/client'; 

let styles = {
    base : {
      title:{ backgroundColor: "red" }
    }
}
styles = outline(styles);

const Title = styles.title`div`

const App = () => <Title>basic</Title>;

// Use createRoot to mount your app
const root = createRoot(document.getElementById('root'));
root.render(<App />);