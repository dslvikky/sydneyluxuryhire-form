import React, { useState } from 'react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { format, parse, isValid } from 'date-fns';
import { Button } from './button';
import { Input } from './input';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { cn } from '@/lib/utils';

interface DateInputProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  placeholder?: string;
}

export function DateInput({ value, onChange, disabled, placeholder = 'Select date' }: DateInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value ? format(value, 'dd/MM/yyyy') : '');
  const [calendarView, setCalendarView] = useState<'days' | 'months' | 'years'>('days');
  const [viewDate, setViewDate] = useState(value || new Date());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const parsedDate = parse(newValue, 'dd/MM/yyyy', new Date());
    if (isValid(parsedDate)) {
      onChange(parsedDate);
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    if (value) {
      setInputValue(format(value, 'dd/MM/yyyy'));
    }
  };

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => new Date(2024, i, 1));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
          onClick={() => setCalendarView('days')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {isEditing ? (
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="border-none p-0 focus-visible:ring-0"
              placeholder="DD/MM/YYYY"
            />
          ) : value ? (
            format(value, 'PPP')
          ) : (
            placeholder
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-2 space-y-2">
          {/* Calendar Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                if (calendarView === 'days') {
                  setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));
                } else if (calendarView === 'months') {
                  setViewDate(new Date(viewDate.getFullYear() - 1, viewDate.getMonth()));
                } else {
                  setViewDate(new Date(viewDate.getFullYear() - 10, viewDate.getMonth()));
                }
              }}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <div className="flex gap-1">
              {calendarView !== 'years' && (
                <Button
                  variant="ghost"
                  onClick={() => setCalendarView('months')}
                >
                  {format(viewDate, 'MMMM')}
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={() => setCalendarView('years')}
              >
                {format(viewDate, 'yyyy')}
              </Button>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                if (calendarView === 'days') {
                  setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));
                } else if (calendarView === 'months') {
                  setViewDate(new Date(viewDate.getFullYear() + 1, viewDate.getMonth()));
                } else {
                  setViewDate(new Date(viewDate.getFullYear() + 10, viewDate.getMonth()));
                }
              }}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* View Selection */}
          {calendarView === 'years' ? (
            <div className="grid grid-cols-4 gap-2 p-2">
              {years.map((year) => (
                <Button
                  key={year}
                  variant="ghost"
                  className={cn(
                    'h-9 w-9',
                    value?.getFullYear() === year && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => {
                    setViewDate(new Date(year, viewDate.getMonth()));
                    setCalendarView('months');
                  }}
                >
                  {year}
                </Button>
              ))}
            </div>
          ) : calendarView === 'months' ? (
            <div className="grid grid-cols-3 gap-2 p-2">
              {months.map((month) => (
                <Button
                  key={month.getMonth()}
                  variant="ghost"
                  className={cn(
                    value?.getMonth() === month.getMonth() && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => {
                    setViewDate(new Date(viewDate.getFullYear(), month.getMonth()));
                    setCalendarView('days');
                  }}
                >
                  {format(month, 'MMM')}
                </Button>
              ))}
            </div>
          ) : (
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              disabled={disabled}
              initialFocus
              month={viewDate}
              onMonthChange={setViewDate}
            />
          )}

          {/* Manual Input */}
          <div className="p-2 border-t">
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="DD/MM/YYYY"
              className="w-full"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}