import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background: none;
  background-color: transparent;
`;

const CenteredMainContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: none;
  background-color: transparent;
`;

const BigCard = styled.div`
  background: white;
  border-radius: 32px;
  padding: 64px 48px;
  box-shadow: 0 12px 48px rgba(0,0,0,0.12);
  min-width: 700px;
  max-width: 1100px;
  width: 100%;
  margin: 48px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 900px) {
    min-width: 0;
    max-width: 98vw;
    padding: 32px 8px;
  }
`;

const Container = styled.div`
  max-width: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
`;
const Title = styled.h1`
  color: #333;
  margin: 0;
  font-size: 2rem;
`;
const Section = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;
const Label = styled.label`
  color: #333;
  font-weight: 600;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 8px;
`;
const Input = styled.input`
  padding: 12px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 15px;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;
const SaveButton = styled.button`
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(34, 197, 94, 0.3);
  }
`;

function Settings() {
  const [siteTitle, setSiteTitle] = useState('Admin Panel');
  const [siteLogo, setSiteLogo] = useState('');
  const [profileName, setProfileName] = useState('Admin User');
  const [profileEmail, setProfileEmail] = useState('admin@example.com');

  const [activeSection, setActiveSection] = useState('settings');

  return (
    <DashboardContainer>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <CenteredMainContent>
        <BigCard>
          <Container>
      <Header>
        <Title>Settings</Title>
      </Header>
      <Section>
        <h2>Site Settings</h2>
        <Label>Site Title</Label>
        <Input value={siteTitle} onChange={e => setSiteTitle(e.target.value)} />
        <Label>Site Logo URL</Label>
        <Input value={siteLogo} onChange={e => setSiteLogo(e.target.value)} />
        <SaveButton>Save Site Settings</SaveButton>
      </Section>
      <Section>
        <h2>Profile Settings</h2>
        <Label>Name</Label>
        <Input value={profileName} onChange={e => setProfileName(e.target.value)} />
        <Label>Email</Label>
        <Input value={profileEmail} onChange={e => setProfileEmail(e.target.value)} />
        <SaveButton>Save Profile</SaveButton>
      </Section>
          </Container>
        </BigCard>
      </CenteredMainContent>
    </DashboardContainer>
  );
}

export default Settings; 