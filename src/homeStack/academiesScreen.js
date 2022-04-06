import * as React from 'react';
import {useState} from 'react';
import {ScrollView} from 'react-native';
import Footer from './components/academiesScreen/footer';
import FooterSelector from './components/academiesScreen/footerSelector';
import Header from './components/academiesScreen/header';

export default function AcademiesScreen({route}) {
  const {sports} = route.params;
  const [view, setView] = useState('academies');


  return (
    <ScrollView>
      <Header sports={sports} />
      <FooterSelector view={view} setView={setView} />
      <Footer sports={sports} view={view} />
    </ScrollView>
  );
}
