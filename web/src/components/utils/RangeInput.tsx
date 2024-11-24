import translate from '../../utils/translate';

type RangeInputProps = {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
    labelSuffix?: string;
    className?: string;
    language: string;
};

const RangeInput: React.FC<RangeInputProps> = ({
    label,
    value,
    onChange,
    min,
    max,
    step,
    labelSuffix,
    language,
    className = 'mb-6',
}) => {
    return (
        <div className={className}>
            <label className="block mt-6 mb-2">{translate(label, language)}:</label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full"
            />
            <p className="text-center mt-1">
                {value} {labelSuffix ? translate(labelSuffix, language) : ''}
            </p>
        </div>
    );
};

export default RangeInput;
