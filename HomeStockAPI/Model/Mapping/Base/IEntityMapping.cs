﻿using HomeStockAPI.Model.External;
using HomeStockAPI.Model.Internal.Base;
using System.Collections.Generic;

namespace HomeStockAPI.Model.Mapping.Base
{
    public interface IEntityMapping<DTO, E> 
        where DTO : Entity
        where E : mEntity
    {
        E Map(DTO dto);
        IEnumerable<E> Map(IEnumerable<DTO> dtos);

        DTO Map(E entity);
        IEnumerable<DTO> Map(IEnumerable<E> entities);
    }
}