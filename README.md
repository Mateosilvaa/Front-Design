# Ju Caram | Cílios — Agendamento

## Como rodar
1. `npm install`
2. Preencha o arquivo `.env` com os dados do Firebase (modelo em `.env.example`)
3. No Firebase: ative **Authentication > Anônimo** e crie o **Firestore Database**
4. Cole o conteúdo de `firestore.rules` na aba **Regras** do Firestore e publique
5. `npm run dev`

## Estrutura
- `src/config/` — inicialização do Firebase
- `src/constants/` — serviços, profissionais, horários, meses
- `src/utils/` — funções de data e duração
- `src/services/` — acesso ao Firestore
- `src/hooks/` — `useAuth` e `useAppointments`
- `src/components/` — `Header` e `PhoneFrame`
- `src/screens/` — `HomeScreen`, `AppointmentsScreen`, `BookingFlow`
- `src/screens/booking/` — as 6 etapas do agendamento
