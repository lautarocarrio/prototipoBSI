import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "orden" | "entrega" | "reunion";
}

const events: Event[] = [
  { id: "1", title: "Entrega Proveedor ABC", date: "2026-03-05", time: "10:00", type: "entrega" },
  { id: "2", title: "Revisión Orden OC-045", date: "2026-03-08", time: "14:30", type: "orden" },
  { id: "3", title: "Reunión con Materiales XYZ", date: "2026-03-12", time: "11:00", type: "reunion" },
  { id: "4", title: "Entrega Tech Solutions", date: "2026-03-15", time: "09:00", type: "entrega" },
  { id: "5", title: "Aprobación Orden OC-052", date: "2026-03-18", time: "16:00", type: "orden" },
  { id: "6", title: "Entrega Office Supplies", date: "2026-03-22", time: "13:00", type: "entrega" },
  { id: "7", title: "Reunión Trimestral", date: "2026-03-25", time: "10:00", type: "reunion" },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // March 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "entrega": return "bg-red-500";
      case "orden": return "bg-yellow-500";
      case "reunion": return "bg-red-600";
      default: return "bg-gray-500";
    }
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="p-8 bg-white">
      <div className="mb-8">
        <h1 className="text-2xl mb-2 text-red-600">Calendario</h1>
        <p className="text-[#64748b]">Gestiona entregas y eventos importantes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-[#e2e8f0]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-red-600">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={goToPreviousMonth}
                className="p-2 hover:bg-[#fef9c3] rounded-lg transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNextMonth}
                className="p-2 hover:bg-[#fef9c3] rounded-lg transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-sm text-[#64748b] py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const dayEvents = getEventsForDate(day);
              const today = isToday(day);

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                  className={`aspect-square p-2 rounded-lg border transition-colors ${
                    today
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-[#e2e8f0] hover:border-red-300 hover:bg-[#fef2f2]"
                  }`}
                >
                  <div className="text-sm mb-1">{day}</div>
                  <div className="flex gap-1 justify-center flex-wrap">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className={`w-1.5 h-1.5 rounded-full ${getEventColor(event.type)}`}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-[#e2e8f0]">
          <h3 className="mb-4 text-red-600">Próximos Eventos</h3>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border-l-4 pl-3 py-2" style={{ borderColor: getEventColor(event.type).replace("bg-", "#") }}>
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm">{event.title}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#64748b]">
                  <Clock size={12} />
                  <span>{event.date} • {event.time}</span>
                </div>
                <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs ${
                  event.type === "entrega" ? "bg-red-100 text-red-800" :
                  event.type === "orden" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-6 border border-[#e2e8f0]">
        <h3 className="mb-4 text-red-600">Leyenda</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm text-[#64748b]">Entregas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-sm text-[#64748b]">Órdenes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600" />
            <span className="text-sm text-[#64748b]">Reuniones</span>
          </div>
        </div>
      </div>
    </div>
  );
}